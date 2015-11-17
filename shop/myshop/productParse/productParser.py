import sqlite3 as lite
import re
import myshop.models as models

def getID(name):
    con = lite.connect('db.sqlite3')
    cur = con.cursor()

    querystr = "SELECT ID FROM myshop_categories WHERE name=\"" + name.strip() +"\";"
    #querystr = querystr.decode("utf-8")
    cur.execute(querystr)
    data = cur.fetchone()
    con.close()
    return data[0]

def parse(path):
    #catparser.tablefy(open("shopv2/static/shop/Categories.txt","r").read())
    string = open(path, encoding="utf8").read()
    lst = re.split("\n(?!\t)", string)
    for i in lst:
        categoryname = re.search("^.*\n", i).group(0).strip()
        categoryname = re.split(' / ', categoryname.split('\t')[0]).pop()
        left = re.sub("^.*\n", "", i)
        newlst = (left).split('\n')
        for j in newlst:
            productlist = j.strip().split('\t')
            if(len(productlist) > 3):
                pid = getID(categoryname)
                print(j)
                category = models.Categories.objects.get(id=pid)
                p = models.Product.objects.create(name=productlist[1].strip(),
                            price= productlist[21].strip(),
                            category=category)
