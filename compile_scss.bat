@echo off
echo "This will compile SCSS in the styles directory to a single style.css"
echo "Add --style compressed to compress output"
scss styles/styles.scss --style compressed > styles.css