"""生成部署后的网页二维码：python -m pip install qrcode[pil]；python generate_qr.py https://你的网址"""
import sys
if len(sys.argv)!=2 or not sys.argv[1].startswith('https://'):
    raise SystemExit('用法: python generate_qr.py https://username.github.io/meiwei-h5/')
try:
    import qrcode
except ImportError:
    raise SystemExit('请先运行: python -m pip install "qrcode[pil]"')
qrcode.make(sys.argv[1]).save('meiwei-qr.png')
print('已生成 meiwei-qr.png，对应网址：',sys.argv[1])
