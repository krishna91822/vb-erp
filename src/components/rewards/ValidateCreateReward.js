export default function validateForm(data) {
  let errors = {};
  if (!data.reward_display_name || data.reward_display_name === "") {
    errors.reward_display_name = "this field is required";
  }
  if (!data.reward_type) {
    errors.reward_type = "this field is required";
  }
  if (!data.reward_sender || data.reward_sender === "") {
    errors.reward_sender = "this field is required";
  }
  if (!data.reward_receiver || data.reward_receiver === "") {
    errors.reward_receiver = "this field is required";
  }
  if (!data.receiver_message || data.receiver_message === "") {
    errors.receiver_message = "this field is required";
  }
  if (!data.announcement_type || data.announcement_type === "") {
    errors.announcement_type = "this field is required";
  }
  return errors;
}
