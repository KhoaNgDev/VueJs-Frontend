import { ref } from "vue";
import Swal from "sweetalert2";
import {
  searchRepairs,
  submitFeedback,
  removeFeedback,
  requestOtpForLookup,
  verifyOtpForLookup,
} from "../services/repairService";
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore"; // nếu có store

export function useRepairHistory(
  phone,
  plate,
  phoneError,
  plateError,
  showOtpForm,
  otp
) {
  const history = ref([]);
  const searched = ref(false);
  const loading = ref(false);
  const ratings = ref({});
  const canExport = ref(false);

  const authStore = useAuthStore();
  const authUserId = computed(() => authStore.user?.id || null);

  const handleError = (error, fallbackMsg) => {
    const data = error?.response?.data;
    let message = fallbackMsg;

    if (data) {
      if (data.errors) {
        message = Object.values(data.errors).flat().join("<br>");
      } else if (data.message) {
        message = data.message;
      }
    } else if (error?.message) {
      message = `${fallbackMsg}<br>${error.message}`;
    }

    Swal.fire("Lỗi", message, "error");
  };

  const handleSearch = async () => {
    phoneError.value = "";
    plateError.value = "";
    loading.value = true;
    searched.value = false;
    history.value = [];
    ratings.value = {};
    canExport.value = false;

    if (!phone?.value && !plate?.value) {
      loading.value = false;
      Swal.fire(
        "Thông báo",
        "Vui lòng nhập số điện thoại hoặc biển số xe.",
        "warning"
      );
      return;
    }

    if (phone?.value) {
      const phonePattern = /^0\d{9,10}$/;
      if (!phonePattern.test(phone.value)) {
        loading.value = false;
        phoneError.value = "Số điện thoại không hợp lệ.";
        Swal.fire("Lỗi", "Số điện thoại không đúng định dạng.", "error");
        return;
      }
    }

    try {
      await requestOtpForLookup({
        plate: plate?.value || null,
        phone: phone?.value || null,
      });

      showOtpForm.value = true;

      Swal.fire(
        "OTP đã gửi",
        "Vui lòng kiểm tra email và nhập mã OTP để tiếp tục.",
        "info"
      );
    } catch (error) {
      handleError(error, "Không thể gửi OTP.");
    } finally {
      loading.value = false;
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp?.value) {
      Swal.fire("Thiếu mã OTP", "Vui lòng nhập mã OTP.", "warning");
      return;
    }

    loading.value = true;

    try {
      await verifyOtpForLookup({
        plate: plate?.value || null,
        phone: phone?.value || null,
        otp: otp.value,
      });

      Swal.fire(
        "Thành công",
        "Xác thực thành công. Đang tra cứu...",
        "success"
      );
      showOtpForm.value = false;
      canExport.value = true;

      await performSearch();
    } catch (error) {
      handleError(error, "Xác thực OTP thất bại.");
    } finally {
      loading.value = false;
    }
  };

  const performSearch = async () => {
    loading.value = true;
    searched.value = false;
    history.value = [];
    ratings.value = {};

    try {
      const data = await searchRepairs({
        phone: phone?.value || null,
        plate: plate?.value || null,
      });
      console.log("authUserId:", authUserId.value);
      console.log(
        "authUserId.value type:",
        typeof authUserId.value,
        authUserId.value
      );

      data.forEach((vehicle) => {
        vehicle.repairs.forEach((repair) => {
          repair.user_id = repair.user_id || vehicle.user_id;
          repair.canRate = Number(authUserId.value) === Number(repair.user_id);

          if (repair.feedback) {
            ratings.value[repair.id] = {
              rating: repair.feedback.rating,
              comment: repair.feedback.comment,
            };
          }

          console.log(
            "repair id:",
            repair.id,
            "user_id:",
            repair.user_id,
            "authUserId:",
            authUserId.value,
            "canRate:",
            repair.canRate
          );
        });
      });

      history.value = data;
    } catch (error) {
      handleError(error, "Không thể tra cứu lịch sử.");
    } finally {
      loading.value = false;
      searched.value = true;
    }
  };

  const updateFeedback = async (repairId, payload) => {
    console.log(
      "Submitting feedback for repairId:",
      repairId,
      "payload:",
      payload
    );
    if (!repairId || !payload || !payload.rating || payload.rating === 0) {
      Swal.fire("Thiếu thông tin", "Vui lòng điền đầy đủ đánh giá.", "warning");
      return;
    }

    try {
      Swal.fire({
        title: "Đang lưu đánh giá...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const newFeedback = await submitFeedback(repairId, payload);

      if (!newFeedback.created_at) {
        newFeedback.created_at = new Date().toISOString();
      }

      const vehicle = history.value.find((v) =>
        v.repairs.some((r) => r.id === repairId)
      );
      if (!vehicle) return;

      const repair = vehicle.repairs.find((r) => r.id === repairId);
      console.log("repair.canRate:", repair?.canRate);
      if (!repair.canRate) {
        Swal.fire(
          "Không được phép",
          "Bạn không có quyền đánh giá sửa chữa này.",
          "warning"
        );
        return;
      }
      repair.repair_feedbacks = [newFeedback];

      Swal.fire("Cảm ơn", "Đánh giá của bạn đã được ghi nhận.", "success");
    } catch (error) {
      handleError(error, "Không thể lưu đánh giá.");
    }
  };
  const deleteFeedback = async (feedbackId) => {
    const confirm = await Swal.fire({
      title: "Xoá đánh giá?",
      text: "Bạn chắc chắn muốn xoá đánh giá này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ",
    });

    if (!confirm.isConfirmed) return;

    try {
      Swal.fire({
        title: "Đang xoá phản hồi...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await removeFeedback(feedbackId);

      history.value.forEach((vehicle) => {
        vehicle.repairs.forEach((repair) => {
          repair.repair_feedbacks = repair.repair_feedbacks.filter(
            (fb) => fb.id !== feedbackId
          );
        });
      });

      Swal.fire("Đã xoá", "Phản hồi đã được xoá.", "success");
    } catch (error) {
      handleError(error, "Không thể xoá phản hồi.");
    }
  };

  return {
    history,
    searched,
    loading,
    authUserId,
    ratings,
    canExport,
    handleSearch,
    handleVerifyOtp,
    performSearch,
    updateFeedback,
    deleteFeedback,
  };
}
