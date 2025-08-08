#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

#[tauri::command]
fn save_document(content: String, filename: String) -> Result<String, String> {
    use std::fs;
    
    let documents_dir = dirs::document_dir()
        .ok_or("Could not find documents directory")?;
    
    let legal_ai_dir = documents_dir.join("LegalAI");
    if !legal_ai_dir.exists() {
        fs::create_dir_all(&legal_ai_dir)
            .map_err(|e| format!("Could not create LegalAI directory: {}", e))?;
    }
    
    let file_path = legal_ai_dir.join(&filename);
    fs::write(&file_path, content)
        .map_err(|e| format!("Could not save file: {}", e))?;
    
    Ok(file_path.to_string_lossy().to_string())
}

#[tauri::command]
fn get_system_info() -> serde_json::Value {
    serde_json::json!({
        "platform": std::env::consts::OS,
        "arch": std::env::consts::ARCH,
        "version": env!("CARGO_PKG_VERSION")
    })
}

fn main() {
    let menu = Menu::new()
        .add_submenu(Submenu::new("File", Menu::new()
            .add_item(CustomMenuItem::new("new_document", "New Document"))
            .add_item(CustomMenuItem::new("open_document", "Open Document"))
            .add_item(CustomMenuItem::new("save_document", "Save Document"))
        ))
        .add_submenu(Submenu::new("Edit", Menu::new()
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::SelectAll)
        ))
        .add_submenu(Submenu::new("View", Menu::new()
            .add_item(CustomMenuItem::new("toggle_devtools", "Toggle Developer Tools"))
        ));

    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![save_document, get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
