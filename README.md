# barbara-memorial-slideshow

## Integrations

Currently, I'm using the Flickr API since it provides an interface to sort an album without having to rely on file name, updated, created etc.

There is a static builder script that can be used to rename files so they can be ordered, and also a data building script which reads the directory of slide images and makes javascript objects out of them.

## Commands

Rename images in slide directory
```shell
npm run rename
```

Build slide data
```shell
npm run build
```
