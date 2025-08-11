import api from "./api";

export const searchRepairs = async ({ phone, plate }) => {
  const { data } = await api.post("/repair/repair-search", { phone, plate });
  return data;
};

export const submitFeedback = async (repairId, payload) => {
  const { data } = await api.post("feedback/submit-rating", {
    repair_id: repairId,
    feedback: payload.feedback,
    rating: payload.rating,
  });
  return data;
};
export const removeFeedback = async (feedbackId) => {
  return api.delete(`/feedback/${feedbackId}`);
};
export const requestOtpForLookup = async ({ plate, phone }) => {
  return api.post("/repair/request-otp", { plate, phone });
};

export const verifyOtpForLookup = async ({ plate, phone, otp }) => {
  return api.post("/repair/verify-otp", { plate, phone, otp });
};
export const exportRepairs = (vehicleId) => {
  return api.get(`/vehicles/${vehicleId}/repairs/export`, {
    responseType: 'blob'
  })
}
