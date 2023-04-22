class Camera:
    def __init__(self, props):
        self.id = props["id"]
        self.name = props["name"]
        self.videoSrc = props["videoSrc"]
        self.bHeight = props["bHeight"]
        self.bWidth = props["bWidth"]
        self.type = props["type"]
        self.binary = props["binary"]

    def __str__(self):
        return self.name
