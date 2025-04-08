import { resolve } from 'path'; // Import resolve from 'path'

const nextConfig = {
  webpack(config: any, { isServer }: { isServer: boolean }) {
    if (!isServer) {
      // Resolve alias for src
      config.resolve.alias['@'] = resolve(__dirname, 'src');
    }
    return config;
  },
};

export default nextConfig; // Use export default to export the config
