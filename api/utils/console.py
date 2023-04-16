import sys
class console:
    @staticmethod
    def log(*data):
        sys.stdout.write("".join([str(arg) for arg in data]) + "\n")
        sys.stdout.flush()