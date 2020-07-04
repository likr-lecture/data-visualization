# この資料について

本資料は日本大学文理学部情報科学科尾上ゼミの講義資料です。
本資料は JavaScript のライブラリ React と D3.js を用いたデータビジュアライゼーションを扱います。

本資料は、望みの視覚的表現を自力で実装できる力をつけることを目的にします。
既存ツールを駆使してデータビジュアライゼーションを簡単に行う方法はこの資料の対象外です。

# 表記方法

**重要な専門用語** はこのように太字で表記します。

<u>重要な説明文章はこのように下線で表記します。</u>

```javascript
console.log("プログラムはこのようなコードブロックで表記します。");
```

プログラムの一部を指す際には、`console.log`のように表記します。

# 前提知識

HTML、CSS、JavaScript と React の基本的な知識を有していることを前提とします。
以下のドキュメントに目を通しておくことを推奨します。

- [Getting started with the Web](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)
- [JavaScript Primer](https://jsprimer.net/)
- [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)

# バージョン情報

本資料で使用するライブラリのバージョンは以下の通りです。

- React：バージョン 16 の最新版
- D3.js：バージョン 5 の最新版

バージョン違いによる互換性の問題に注意してください。

# 学習環境

本資料では、CodePen（ https://codepen.io/ ）を使用して React を学習します。
CodePen は Web ブラウザ上で HTML、CSS、JavaScript を用いた Web ページ制作ができる Web サービスです。
まず始めに CodePen のアカウントを作りログインしてください。

CodePen で作成する小さな Web ページのことを Pen と呼びます。
Pen は HTML、CSS、JavaScript のファイルを一つずつ含みます。
必要に応じて外部ライブラリ等を読み込むことができます。

CodePen 上で React を動かすためにはいくつかの設定が必要です。
（正確には、React によるプログラミングを簡単にする JSX という記法を動かすための設定です。）
以下のリンクをクリックすることで、React が動作可能な環境が設定済みの状況で新しい Pen を作成できます。
https://codepen.io/pen?template=GLJzEK

自分で一から設定してみたい人は次のセクションをご覧ください。

## CodePen での React の設定

本セクションは上述のテンプレートを使用せずに、codepen 上で React が動作するように設定する方法を紹介します。
不要な方は読み飛ばしてください。

1. 画面右上「Settings」ボタンを押す
1. 「JavaScript」タブを選ぶ
1. 「JavaScript Preprocessor」で「Babel」を選ぶ
1. 「Add External Scripts/Pens」で「 https://unpkg.com/react@16/umd/react.development.js 」と「 https://unpkg.com/react-dom@16/umd/react-dom.development.js 」を追記する
1. 「Save & Close」ボタンを押す

## 注意

本資料は学習用途として環境構築を省略するために codepen を使用しています。
<u>製品レベルの Web サイトを制作するのには向きません。</u>
詳細な情報は公式 Web サイト（ https://reactjs.org/ ）も合わせてご覧ください。
