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
    
    let legal_ai_dir = documents_dir.join("DocForge");
    if !legal_ai_dir.exists() {
        fs::create_dir_all(&legal_ai_dir)
            .map_err(|e| format!("Could not create DocForge directory: {}", e))?;
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
    // Create comprehensive legal workflow menu structure
    let menu = Menu::new()
        .add_submenu(Submenu::new("Counsel", Menu::new()
            .add_item(CustomMenuItem::new("about", "About Counsel"))
            .add_item(CustomMenuItem::new("preferences", "Preferences…"))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("sign_in", "Sign In / Sign Out"))
            .add_item(CustomMenuItem::new("account_settings", "Account Settings"))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit)
        ))
        .add_submenu(Submenu::new("File", Menu::new()
            .add_item(CustomMenuItem::new("new_document", "New Document…"))
            .add_item(CustomMenuItem::new("open_case", "Open Case…"))
            .add_item(CustomMenuItem::new("close_case", "Close Case"))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("save", "Save"))
            .add_item(CustomMenuItem::new("save_as", "Save As…"))
            .add_native_item(MenuItem::Separator)
            .add_submenu(Submenu::new("Export", Menu::new()
                .add_item(CustomMenuItem::new("export_pdf", "PDF (Court-ready)"))
                .add_item(CustomMenuItem::new("export_docx", "DOCX"))
                .add_item(CustomMenuItem::new("export_efiling", "eFiling XML"))
            ))
            .add_item(CustomMenuItem::new("import", "Import…"))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("recent_cases", "Recent Cases"))
        ))
        .add_submenu(Submenu::new("Edit", Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("insert_clause", "Insert Legal Clause"))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("find", "Find"))
            .add_item(CustomMenuItem::new("replace", "Replace"))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("ai_rewrite", "AI Rewrite / Summarize"))
            .add_item(CustomMenuItem::new("add_citation", "Add Citation"))
        ))
        .add_submenu(Submenu::new("Selection", Menu::new()
            .add_native_item(MenuItem::SelectAll)
            .add_item(CustomMenuItem::new("select_section", "Select Section"))
            .add_item(CustomMenuItem::new("select_citation", "Select Citation"))
            .add_item(CustomMenuItem::new("mark_review", "Mark for Review"))
        ))
        .add_submenu(Submenu::new("View", Menu::new()
            .add_item(CustomMenuItem::new("toggle_sidebar", "Toggle Sidebar"))
            .add_item(CustomMenuItem::new("toggle_ai_panel", "Toggle AI Assistant Panel"))
            .add_item(CustomMenuItem::new("split_view", "Split View"))
            .add_item(CustomMenuItem::new("show_deadlines", "Show Filing Deadlines"))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::EnterFullScreen)
        ))
        .add_submenu(Submenu::new("Go", Menu::new()
            .add_item(CustomMenuItem::new("dashboard", "Dashboard"))
            .add_item(CustomMenuItem::new("document_generator", "Document Generator"))
            .add_item(CustomMenuItem::new("legal_research", "Legal Research"))
            .add_item(CustomMenuItem::new("due_diligence", "Due Diligence Toolkit"))
            .add_item(CustomMenuItem::new("case_management", "Case Management"))
        ))
        .add_submenu(Submenu::new("Run", Menu::new()
            .add_item(CustomMenuItem::new("generate_draft", "Generate Draft (AI-assisted)"))
            .add_item(CustomMenuItem::new("check_compliance", "Check Compliance"))
            .add_item(CustomMenuItem::new("generate_toa", "Generate Table of Authorities"))
            .add_item(CustomMenuItem::new("run_dd_report", "Run Due Diligence Report"))
            .add_item(CustomMenuItem::new("file_court", "File to Court Portal"))
        ))
        .add_submenu(Submenu::new("Tools", Menu::new()
            .add_item(CustomMenuItem::new("case_law_search", "Case Law Search"))
            .add_item(CustomMenuItem::new("background_checks", "Background Checks"))
            .add_item(CustomMenuItem::new("corporate_lookup", "Corporate Lookup"))
            .add_item(CustomMenuItem::new("citation_formatter", "Citation Formatter"))
            .add_item(CustomMenuItem::new("deadline_calculator", "Deadline Calculator"))
        ))
        .add_submenu(Submenu::new("Window", Menu::new()
            .add_native_item(MenuItem::Minimize)
            .add_native_item(MenuItem::Zoom)
            .add_item(CustomMenuItem::new("arrange_tabs", "Arrange Tabs"))
            .add_item(CustomMenuItem::new("merge_windows", "Merge All Windows"))
            .add_item(CustomMenuItem::new("show_toolbar", "Show/Hide Toolbar"))
        ))
        .add_submenu(Submenu::new("Help", Menu::new()
            .add_item(CustomMenuItem::new("help_center", "Counsel Help Center"))
            .add_item(CustomMenuItem::new("how_to_motion", "How to Draft a Motion"))
            .add_item(CustomMenuItem::new("jurisdiction_guide", "Jurisdiction Guide"))
            .add_item(CustomMenuItem::new("ai_usage_tips", "AI Usage Tips"))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("report_issue", "Report an Issue"))
        ));

    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![save_document, get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
