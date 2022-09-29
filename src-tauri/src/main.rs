#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::net::TcpStream;
use tauri::Manager;
use tungstenite::stream::MaybeTlsStream;
use tungstenite::{connect, Message, WebSocket};
use url::Url;

#[tauri::command]
fn hello() -> String {
    return "Hello".into();
}

#[derive(Clone, serde::Serialize)]
struct TradePayload {
    message: String,
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            #[cfg(debug_assertions)]
            {
                let _ = &window.open_devtools();
            }

            std::thread::spawn(move || {
                let (mut socket, _response) =
                    connect(Url::parse("wss://stream.data.alpaca.markets/v2/sip").unwrap())
                        .expect("Can't connect");

                authenticate(&mut socket);
                subscribe(&mut socket);
                loop {
                    let msg = socket.read_message().expect("Can't read message");

                    let _ = &window.emit(
                        "trade",
                        TradePayload {
                            message: msg.to_string(),
                        },
                    );
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![hello])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn authenticate(socket: &mut WebSocket<MaybeTlsStream<TcpStream>>) {
    let key = env!("APCA_API_KEY_ID");
    let secret = env!("APCA_API_SECRET_KEY");
    let authenticate_message = r#"{
        "action": "auth",
        "key": "API-KEY",
        "secret": "SECRET-KEY"
    }"#
    .to_string()
    .replace("API-KEY", key)
    .replace("SECRET-KEY", secret);

    socket
        .write_message(Message::Text(authenticate_message.into()))
        .expect("Authentication request failed");
}

fn subscribe(socket: &mut WebSocket<MaybeTlsStream<TcpStream>>) {
    let subscribe_message = r#"{
        "action": "subscribe",
        "trades": ["AAPL"]
    }"#;

    socket
        .write_message(Message::Text(subscribe_message.into()))
        .expect("Subscription request failed");
}
