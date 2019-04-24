var webpack=require('webpack');
var path=require('path');

module.exports={
	context:__dirname+'/src',
	entry:'./js/root.js',
	module:{
		rules:[{
			test:/\.js?$/,
			exclude:/(node_modules)/,
			loader:'babel-loader',
		 query: {
   		   presets: ['@babel/react'],
        plugins: ['@babel/proposal-class-properties','react-html-attrs',
				["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css" // `style: true` 会加载 less 文件
    }]],
    }
	},
	//下面是添加的 css 的 loader，也即是 css 模块化的配置方法，大家可以拷贝过去直接使用
		 {
			 test: /\.css$/,
			 loader: 'style-loader!css-loader'
		 },
	]
	},
	output:{
		path:__dirname+'/src/',
		filename:'bundle.js'
	},
	mode:'development'
};
