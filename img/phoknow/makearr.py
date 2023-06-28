import subprocess

out = subprocess.run(['ls', '-m'], stdout=subprocess.PIPE).stdout
ss = ['"' + s[:s.find('.')] + '"' for s in out.decode('utf-8').split(', ')]
# ss.remove('"makearr"')
ss.remove('"Makefil"')
print(',\n'.join(ss))
