#!/usr/bin/env bash
# ── WEC 2027 — Lightsail VPS first-boot setup ────────────────────────────────
# Run once as root (or with sudo) on a fresh Ubuntu 22.04 Lightsail instance:
#   bash setup.sh
# After it finishes:
#   1. Edit /var/www/wec2027/server/.env  (add MONGODB_URI + CORS_ORIGIN)
#   2. pm2 start ecosystem.config.cjs --env production
#   3. pm2 save && pm2 startup
set -euo pipefail

REPO_URL="${1:-}"   # optional: pass your GitHub HTTPS URL as first argument
DEPLOY_DIR="/var/www/wec2027"
NODE_VERSION="20"

echo "==> Updating apt…"
apt-get update -y && apt-get upgrade -y

echo "==> Installing Node.js ${NODE_VERSION}…"
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt-get install -y nodejs

echo "==> Installing nginx, git, pm2…"
apt-get install -y nginx git
npm install -g pm2

echo "==> Setting up deploy directory…"
mkdir -p "$DEPLOY_DIR"

if [ -n "$REPO_URL" ]; then
  echo "==> Cloning $REPO_URL…"
  git clone "$REPO_URL" "$DEPLOY_DIR"
else
  echo "==> No repo URL provided — skipping clone. Copy files to $DEPLOY_DIR manually."
fi

cd "$DEPLOY_DIR"

echo "==> Installing dependencies…"
npm run install:all

echo "==> Building client…"
npm run build

echo "==> Copying nginx config…"
cp nginx.conf /etc/nginx/sites-available/wec2027
ln -sf /etc/nginx/sites-available/wec2027 /etc/nginx/sites-enabled/wec2027
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo ""
echo "✔ Setup complete."
echo ""
echo "Next steps:"
echo "  1. cp $DEPLOY_DIR/server/.env.example $DEPLOY_DIR/server/.env"
echo "     nano $DEPLOY_DIR/server/.env   # fill in MONGODB_URI + CORS_ORIGIN"
echo ""
echo "  2. cd $DEPLOY_DIR"
echo "     pm2 start ecosystem.config.cjs --env production"
echo "     pm2 save"
echo "     pm2 startup   # follow the printed command to enable auto-start"
echo ""
echo "  3. Open port 80 in your Lightsail firewall (Networking tab)."
