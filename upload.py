import os
import subprocess

def find_packages(folder):
    packages= []
    for item in os.listdir(folder):
        if item == "package.json":
            packages.append(folder)
        elif os.path.isdir(folder + "\\" + item):
            packages.extend(find_packages(folder + "\\" + item))
    return packages

path = input("Enter the path of the node modules folder: ")
dest = input("Enter the .the archives destination folder: ")
for package in find_packages(path):
    print(package)
    result = subprocess.run("npm pack .", stdout=subprocess.PIPE, shell=True, cwd=package)
    print(result.stdout.decode("UTF-8"))
    for file in os.listdir(package):
        if file.endswith(".tgz"):
            print("Created .tgz archive")
            try:
                os.rename(package + "\\" + file, dest + "\\" + file)
            except FileExistsError:
                print("Archive already exists in the destination path")
print("\n")
print("Done.")
input("")