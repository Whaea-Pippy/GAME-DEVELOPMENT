{ pkgs, ... }: {
  # Use the latest stable channel for Nix packages
  channel = "stable-24.05";

  # A list of packages to install from the specified channel.
  packages = [
    pkgs.nodejs_20  # Node.js version 20
  ];

  # VS Code extensions to install from the Open VSX Registry.
  idx = {
    extensions = [
      "dbaeumer.vscode-eslint"
    ];

    # Workspace lifecycle hooks.
    workspace = {
      # Runs when a workspace is first created.
      onCreate = {
        npm-install = "npm install";
      };
      # Runs every time the workspace is (re)started.
      onStart = {
        start-server = "npm run dev";
      };
    };

    # Configure a web preview for your application.
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT"];
          manager = "web";
        };
      };
    };
  };
}
