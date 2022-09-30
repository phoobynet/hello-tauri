use serde::{Deserialize, Serialize};

#[derive(Debug)]
pub struct RawMessage {
    pub message_type: String,
    pub msg: Option<String>,
    pub code: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct TradeMessage {
    #[serde(rename = "T")]
    message_type: String,

    #[serde(rename = "i")]
    index: u32,

    #[serde(rename = "S")]
    symbol: String,

    #[serde(rename = "x")]
    exchange: String,

    #[serde(rename = "p")]
    price: f32,

    #[serde(rename = "s")]
    size: f32,

    #[serde(rename = "t")]
    timestamp: String,
}
