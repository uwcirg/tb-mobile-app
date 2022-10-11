export default function isBroadcastChannelSupported() {
  // When running in a sandboxed iframe, the BroadcastChannel API
  // is not actually available and throws an exception
  try {
    const channel = new BroadcastChannel("feature_test");
    channel.close();
    return true;
  } catch (err) {
    return false;
  }
}
