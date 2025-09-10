{ pkgs, ... }: {
  # channel = "stable-23.11"; # or "unstable"

  # Add packages to your environment to resolve the 'pkgs' not used warning
  # and provide useful tools like Node.js and npm.
  packages = [
    pkgs.nodejs_20
  ];
}
