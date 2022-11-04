export default function getNotificationPreference() {
  if (!("Notification" in window)) {
    return "unsupported";
  }
  return Notification.permission;
}
