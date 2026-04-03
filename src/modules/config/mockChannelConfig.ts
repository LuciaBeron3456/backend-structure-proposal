/**
 * MOCK: minimal `ChannelConfig`-shaped object for GET /config/channels.
 * Not persisted; aligns with frontend `channelApi.listChannels()` shape.
 */
const base = {
  enabled: false,
  bot_prefix: "",
};

export function getMockChannelConfig(): Record<string, unknown> {
  return {
    imessage: {
      ...base,
      db_path: "",
      poll_sec: 30,
    },
    discord: { ...base, bot_token: "", http_proxy: "", http_proxy_auth: "" },
    dingtalk: {
      ...base,
      client_id: "",
      client_secret: "",
      message_type: "",
      card_template_id: "",
      card_template_key: "",
      robot_code: "",
    },
    feishu: {
      ...base,
      app_id: "",
      app_secret: "",
      encrypt_key: "",
      verification_token: "",
      media_dir: "",
    },
    qq: { ...base, app_id: "", client_secret: "" },
    telegram: { ...base, bot_token: "", http_proxy: "", http_proxy_auth: "" },
    mqtt: {
      ...base,
      host: "",
      port: 1883,
      transport: "tcp",
      clean_session: true,
      qos: 0,
      username: "",
      password: "",
      subscribe_topic: "",
      publish_topic: "",
    },
    matrix: { ...base, homeserver: "", user_id: "", access_token: "" },
    mattermost: { ...base, url: "", bot_token: "" },
    wecom: { ...base, bot_id: "", secret: "", media_dir: "" },
    console: { ...base },
    voice: {
      ...base,
      twilio_account_sid: "",
      twilio_auth_token: "",
      phone_number: "",
      phone_number_sid: "",
      tts_provider: "",
      tts_voice: "",
      stt_provider: "",
      language: "",
      welcome_greeting: "",
    },
    xiaoyi: {
      ...base,
      ak: "",
      sk: "",
      agent_id: "",
      ws_url: "",
    },
  };
}
