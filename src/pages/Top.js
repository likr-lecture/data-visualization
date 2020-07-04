import React from "react";
import { Link } from "react-router-dom";

export const Top = () => {
  return (
    <div className="content">
      <h2>1次元データ</h2>
      <ul>
        <li>
          <Link to="/bar-chart">棒グラフ</Link>
        </li>
        <li>ワッフルチャート</li>
        <li>円グラフ</li>
        <li>ドーナツグラフ</li>
      </ul>
      <h2>2次元データ</h2>
      <ul>
        <li>
          <Link to="/scatter-plot">散布図</Link>
        </li>
        <li>
          <Link to="/density-plot">密度プロット</Link>
        </li>
        <li>ヒートマップ</li>
      </ul>
      <h2>高次元データ</h2>
      <ul>
        <li>散布図行列</li>
        <li>レーダーチャート</li>
        <li>平行座標プロット</li>
      </ul>
      <h2>時系列データ</h2>
      <ul>
        <li>
          <Link to="/line-chart">折れ線グラフ</Link>
        </li>
        <li>面グラフ</li>
        <li>バンプチャート</li>
      </ul>
      <h2>階層データ</h2>
      <ul>
        <li>ツリーマップ</li>
        <li>サークルパッキング</li>
        <li>サンバースト図</li>
      </ul>
      <h2>関係データ</h2>
      <ul>
        <li>
          <Link to="/chord-diagram">コード図</Link>
        </li>
        <li>アーク図</li>
        <li>
          <Link to="/node-link-diagram">ノードリンク図</Link>
        </li>
        <li>サンキー図</li>
      </ul>
      <h2>地理データ</h2>
      <ul>
        <Link to="/choropleth-map">コロプレスマップ</Link>
      </ul>
    </div>
  );
};
