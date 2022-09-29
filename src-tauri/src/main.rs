#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn poop(name: &str) -> String {
    format!("{} is a poopy head!", name)
}

#[tauri::command]
fn hello(name: &str) -> String {
    format!("Hello, World {}!", name)
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![poop, hello])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
