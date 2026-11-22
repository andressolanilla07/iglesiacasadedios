export const GITHUB_PAGES_BASE_PATH = "/iglesiacasadedios";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicAssetPath(path: `/${string}`): string {
  return `${configuredBasePath}${path}`;
}

export function pathnameWithoutBasePath(pathname: string): string {
  if (!configuredBasePath) {
    return pathname;
  }

  if (pathname === configuredBasePath) {
    return "/";
  }

  if (pathname.startsWith(`${configuredBasePath}/`)) {
    return pathname.slice(configuredBasePath.length);
  }

  return pathname;
}
