rm ./build -rf
npx tsc
SRCPATH=./src
BUILDPATH=./build
cp ./public $BUILDPATH/ -r
cp $SRCPATH/views $BUILDPATH/ -r
