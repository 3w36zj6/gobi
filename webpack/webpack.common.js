const webpack = require("webpack")
const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const srcDir = path.join(__dirname, "..", "src")

module.exports = {
    entry: {
        popup: path.join(srcDir, "popup.tsx"),
        content_script: path.join(srcDir, "content_script.ts"),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
                return chunk.name !== "background"
            }
        },
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        fallback: {
            path: require.resolve("path-browserify")
        }
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: ".",
                to: "../",
                context: "public"
            }],
            options: {},
        }),
    ],
}