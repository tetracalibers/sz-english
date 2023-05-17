## Notionからデータを持ってきて英語ノートをつくりたい

### なんでわざわざ？

Notion単体でもいいんだけど…

- 英文の音声読み上げ機能が欲しい
- ページをまたいだ検索をしたい

### なんとなくのビジョン

ノート更新は全部Notion上で行う。つまりNotion = CMS
（再ビルドのタイミングどうしよう…）

- ビルド時に Notion API でデータを持ってきて、サイト化
- スタイリングは Neat CSS + α
- Web Speech API による英文読み上げボタンを設置
- 文法事項ごとの目次をつくる
- Algolia に英文をつっこんで、英語表現を検索できるようにする
- できれば公開制限がしたい…