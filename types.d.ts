declare module "imagemagick-cli" {
  declare function exec(
    command: string
  ): Promise<{ stdout: string; stderr: string }>;
}
