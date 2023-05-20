import sys
from enum import Enum


class Color(Enum):
    RED = "\033[1;91m"
    GREEN = "\033[1;92m"
    ORANGE = "\033[1;93m"
    BLUE = "\033[1;94m"


class console:
    @staticmethod
    def log(*data):
        sys.stdout.write("".join([str(arg) for arg in data]) + "\n")
        sys.stdout.flush()

    @staticmethod
    def info(from_svc, message):
        console.log(
            Color.BLUE.value,
            "- [" + from_svc + "] >> ",
            message,
            "\033[0m"
        )
    