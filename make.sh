BUILDPATH=./build
SRCPATH=./src
PUBLICPATH=./public
rm $BUILDPATH -rf
npx babel $SRCPATH --presets @babel/preset-typescript --presets @babel/preset-env  --plugins @babel/plugin-transform-runtime  --copy-files --extensions ".ts"   --out-dir $BUILDPATH 
cp $PUBLICPATH $BUILDPATH/ -r