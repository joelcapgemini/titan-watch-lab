"""Rebuild every lab PDF. Run from the repo root: python lab/tools/build_all.py"""
import subprocess
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[2]
builder = root / "lab" / "tools" / "build_lab_pdf.py"

out_dir = root / "handouts"
out_dir.mkdir(exist_ok=True)
subprocess.run([sys.executable, str(builder), str(root), "instructions", str(out_dir / "00-kaiju-lab-instructions.pdf")], check=True)
number = {"lumen-field": "01", "i90-bridge": "02", "seatac": "03", "ballard-locks": "04"}
for folder in sorted((root / "lab" / "scenarios").iterdir()):
    if (folder / "scenario.md").exists():
        out = out_dir / f"{number.get(folder.name, '99')}-{folder.name}-scenario-pack.pdf"
        subprocess.run([sys.executable, str(builder), str(root), "scenario", str(out), str(folder)], check=True)
