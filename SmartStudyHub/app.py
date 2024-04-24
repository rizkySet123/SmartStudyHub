from flask import Flask, render_template, request, jsonify
import json

# Baca file JSON
with open('testdata.json') as file:
    data = json.load(file)

app = Flask(__name__)

def api():
    datas = []
    for item in data:
        id = item['id']
        nama = item['name']
        email = item['email']
        street = item['address']['street']
        zipcode = item['address']['zipcode']
        city = item['address']['city']
        jenjang = item['jenajng']
        mapel = item['mapel']
        tdb = item['tgdb']
        namau = item['namau']
        jenisu = item['jenisu']
        kelas = item['kelas']
        kkm = item['kkm']
        
        data_dict = {
            'id': id,
            'name': nama,
            'email': email,
            'street': street,
            'zipcode': zipcode,
            'city': city,
            'tdb': tdb,
            'jenjang': jenjang,
            'mapel': mapel,
            'namau': namau,
            'jenisu': jenisu,
            'kelas': kelas,
            'kkm': kkm
        }
        
        datas.append(data_dict)

    return datas

@app.route('/api/data')
def api_data():
    data = api()
    return data

@app.route('/get/data', methods=['POST', 'GET'])
def get_data():
    if request.method == 'GET':
        idGuru = request.args.get('id')
        print(idGuru)
        datas = []
        for item in data:
            id = item['id']
            nama = item['name']
            email = item['email']
            street = item['address']['street']
            zipcode = item['address']['zipcode']
            city = item['address']['city']
            jenjang = item['jenajng']
            mapel = item['mapel']
            tdb = item['tgdb']
            namau = item['namau']
            jenisu = item['jenisu']
            kelas = item['kelas']
            kkm = item['kkm']
            
            if id == int(idGuru):
                data_dict = {
                    'id': id,
                    'name': nama,
                    'email': email,
                    'street': street,
                    'zipcode': zipcode,
                    'city': city,
                    'tdb': tdb,
                    'jenjang': jenjang,
                    'mapel': mapel,
                    'namau': namau,
                    'jenisu': jenisu,
                    'kelas': kelas,
                    'kkm': kkm
                }
                datas.append(data_dict)
                
        return jsonify(datas)    
        
    elif request.method == 'POST':
        pass



@app.route('/')
def home():
    return render_template('index.html')
@app.route('/test', methods=['GET', 'POST'])
def test():
    if request.method == 'GET':
        return render_template('testing.html')
    if request.method == 'POST':
        return 'data berhasil ditambahkan'

@app.route('/kelola/guru')
def kelola_guru():
    return render_template('kelola-guru.html')

@app.route('/kelola/siswa')
def kelola_siswa():
    return render_template('kelola-siswa.html')

@app.route('/kelola/ujian')
def kelola_ujian():
    return render_template('kelola-ujian.html')

@app.route('/kelola/mapel')
def kelola_mapel():
    return render_template('mata-pelajaran.html')

@app.route('/kelola/kelas')
def kelas():
    return render_template('kelas.html')

@app.route('/analitik')
def analitik():
    return render_template('analitik.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port='5000', debug=True)