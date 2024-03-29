# vite-11ty-template

## Usage

```shell
# Installs dependencies
$ npm install

# Starts local dev server at localhost:3000
$ npm run dev

# Build for production
$ npm run build
```

## attention

xx.njk で CSS を読み込む際、SCSS と拡張子を開発用のものに合わせる（ build 時に CSS へ変換してくれるのでそのままで大丈夫）

## notes

vite がバージョン 6 にアップデートされると、 CJS の対応をストップします。
eleventy.js は CJS で構築されているため、何らかの対策が必要。
