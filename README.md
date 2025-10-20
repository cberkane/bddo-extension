# BDDo

A VSCode extension for managing tasks using an inspired version of Gherkin syntax (BDD - Behavior-Driven Development).

![VSCode](https://img.shields.io/badge/VSCode-Extension-007ACC?logo=visual-studio-code)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

## 🎯 Overview

BDDo helps developers organize their tasks and testing scenarios using an inspired version of the Given-When-Then syntax from the Behavior-Driven Development approach. Manage your features, tasks, and test cases directly within VSCode. You can create tasks, group them in folders, and define scenarios categorized as Happy Path, Edge cases, or Error cases.

![BDDo: add task demo](./docs/task_add_demo.gif)

![BDDo: add folder demo](./docs/folder_add_demo.gif)

![BDDo: add valid scenario demo](./docs/scenario_add_demo_valid.gif)

![BDDo: add error scenario demo](./docs/scenario_add_demo_error.gif)

![BDDo: complete task demo](./docs/scenario_add_demo_complete.gif)

## ✨ Features

### Current Implementation

- **Project Management**

  - Create and delete folders
  - Add tasks within folders for better organization

- **Task Management**

  - Create, update, and delete tasks
  - Mark tasks as complete or incomplete

- **Scenario Definition**

  - Add, update, and delete scenarios for each task
  - Use a simplified version of Gherkin syntax (given, expected)
  - Define scenario types:
    - Happy Path : Standard successful flow
    - Edge Cases : Uncommon or unexpected user behaviors
    - Error Handling : System failures or error states

  Example:

  ```gherkin inspired
  Feature: User Login
  Scenario: Successful login
  Type: Happy Path
  Given: User is authenticated. User clicks on login button
  Expected: User is redirected to the dashboard
  ```

## 🔷 Tech Stack

- **Frontend**: a webview using React 18
- **Language**: TypeScript
- **Platform**: VSCode Extension API

## 🚀 Installation

### Development Mode

1. Clone the repository:

```bash
git clone https://github.com/cberkane/bddo.git
cd bddo
```

2. Install dependencies:

```bash
npm install
```

3. Launch in VSCode debugger:

   - Press `F5` or use the Debug panel
   - Click on "Run Extension"

4. Open BDDo:
   - Go to the opened VSCode window
   - Open the Command Palette (`Cmd/Ctrl+Shift+P`)
   - Type: `BDDo: open`

### Marketplace Installation

_Coming soon - Extension will be published to VSCode Marketplace after further testing and refinement._

## 🗺️ Roadmap

### Planned Features

- [ ] **Drag & Drop**: to reorder features 
- [ ] **Advanced Filtering**: to filter tasks and scenarios
- [ ] **Rich Metadata**:
  - Task complexity score
  - GitHub issue links
  - Priority levels (low, medium, high)
- [ ] **Panel Integration**: for easier access within VSCode UI
- [ ] **Testing**: Unit and integration tests
- [ ] **Export**: Generate test documentation
- [ ] **Marketplace Publication**: Easy installation for all users

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Test the extension
- Report bugs
- Suggest features
- Submit pull requests

## 👤 Author

Chihab Berkane

---

**Note**: BDDo is actively developed. Features and documentation are continuously updated.
