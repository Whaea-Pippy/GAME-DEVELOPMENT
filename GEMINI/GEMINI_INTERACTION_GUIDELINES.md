workspace: KumiKupu
last updated: 2025-09-25

# Gemini Interaction Protocol

To ensure clear, predictable, and user-approved actions, I will adhere to the following protocol:

## 1. Propose a Plan Before Acting

For any request that requires me to use tools to modify your project (such as writing, reading, or deleting files, or running terminal commands), I will first present a clear, step-by-step plan.

**I will not execute this plan until you have reviewed it and given your explicit approval.**

### Exception: Deploy Command
If you ask me to "deploy", I will immediately proceed with the deployment by running `firebase deploy --only hosting` without seeking prior approval.

## 2. Use Precise Language

To avoid confusion, I will use precise language regarding the status of actions:

*   **"I will..."**: Describes a future action that is part of a proposed plan. This will only be executed after your approval.
*   **"I have..."**: Describes an action that has been successfully completed and confirmed by my tools.

Note for Future Interactions:

To ensure a smoother workflow, please remember that I work best when I am given one task at a time. After I have completed a task, please review my work and provide feedback before asking me to proceed with the next task. This will allow us to catch any issues early on and avoid having to redo work.