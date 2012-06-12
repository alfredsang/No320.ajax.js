#! /bin/bash 
#http://marijnhaverbeke.nl/uglifyjs
# 
# npm install uglify-js
# 
# 
# uglifyjs –o fancyValidate.min.js fancyValidate.js

java -jar thirdparty/compiler-latest/gccompiler.jar --js      src/No320.ajax.js --js_output_file build/No320.ajax.gc.min.js 

java -jar thirdparty/compiler-latest/yuicompressor-2.4.7.jar  src/No320.ajax.js  -o               build/No320.ajax.yui.min.js 
