export function rubyGemDownloadRecipe(parsedFile) {
  const { gem, path } = parsedFile;
  return {
    type: 'CORS_ENABLED_SINGLE_FILE',
    url: `/src?gem=${gem}&path=${path}` // TODO move this to use an imported value
  };
}

export function normalPathCatchall(parsedFile) {
  const { path } = parsedFile;
  const meta = getState().profileView.profile.meta;

  // In general, prefer "standard" values as used by grafana, fallback if not specified.
  // https://grafana.com/docs/grafana-cloud/monitor-applications/profiles/pyroscope-github-integration/#application-with-profiling-data-requirements
  const service_repo = meta.service_repository;
  const service_name = meta.service_name;
  const repo = service_repo || service_name;

  const service_git_ref = meta.service_git_ref;
  const sha = meta.sha;
  const ref = service_git_ref || sha;

  const root = meta.service_root_path;

  return {
    type: 'CORS_ENABLED_SINGLE_FILE',
    url: `/src?repo=${repo}&ref=${ref}&path=${path}&root=${root}`
  };
}
