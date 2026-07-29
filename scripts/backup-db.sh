#!/bin/sh
# Nightly Postgres backup. Intended to run from the host's crontab, e.g.:
#   0 3 * * * cd /path/to/front && ./scripts/backup-db.sh >> backups/backup.log 2>&1
set -eu

cd "$(dirname "$0")/.."

BACKUP_DIR="./backups"
RETENTION_DAYS=30
STAMP="$(date +%F_%H%M%S)"

mkdir -p "$BACKUP_DIR"

# Reads POSTGRES_USER/POSTGRES_DB from .env so this stays in sync with
# whatever docker-compose.yml actually configured.
# shellcheck disable=SC1091
. ./.env

docker compose exec -T postgres pg_dump -U "${POSTGRES_USER:-lcpumps}" "${POSTGRES_DB:-lcpumps}" \
  | gzip > "$BACKUP_DIR/${POSTGRES_DB:-lcpumps}_$STAMP.sql.gz"

find "$BACKUP_DIR" -name "*.sql.gz" -mtime "+$RETENTION_DAYS" -delete

echo "Backup written: $BACKUP_DIR/${POSTGRES_DB:-lcpumps}_$STAMP.sql.gz"
