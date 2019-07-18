import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

    options: any = {
        name: 'attendance.db',
        location: 'default',
        createFromLocation: 1
    }

    public db: SQLiteObject;

    constructor(private sqlite: SQLite) {
        this.connectToDb();
    }

    public connectToDb(): void {
        this.sqlite.create(this.options).then((db: SQLiteObject) => {
            this.db = db;
            var user_query = 'CREATE TABLE IF NOT EXISTS `tbl_notices` (`notice_id` int(11) PRIMARY KEY, `title` varchar(100) DEFAULT NULL, `body` varchar(500) DEFAULT NULL, `image` varchar(100) DEFAULT NULL, `create_date` varchar(100) DEFAULT NULL, `is_active` int(11) NOT NULL)';
            this.db.executeSql(user_query, [])
                .then(() => console.log('Executed SQL' + user_query))
                .catch(e => console.log("Error: " + JSON.stringify(e)));
        })
            .catch(e => console.log("error:" + JSON.stringify(e)));
    }

    setNotices(data) {
        for (let i = 0; i < data.length; i++) {
            this.db.executeSql('SELECT * FROM `tbl_notices` WHERE `notice_id` = ?', [data[i].notice_id])
                .then((result) => {
                    console.log(JSON.stringify(result));
                    if (result.rows.length > 0) {
                        this.db.executeSql('UPDATE `tbl_notices` SET `title`=?, `body`=?, `image`=?, `create_date`=?, `is_active`=? WHERE `notice_id`=?', [data[i].title, data[i].body, data[i].image, data[i].create_date, data[i].is_active, data[i].notice_id])
                            .then((res) => console.log('Executed SQL' + res))
                            .catch(e => console.log("Error: " + JSON.stringify(e)));
                    }
                    else {
                        this.db.executeSql('INSERT INTO `tbl_notices` (`notice_id`, `title`, `body`, `image`, `create_date`, `is_active`) VALUES (?, ?, ?, ?, ?, ?)', [data[i].notice_id, data[i].title, data[i].body, data[i].image, data[i].create_date, data[i].is_active])
                            .then((res) => console.log('Executed SQL' + JSON.stringify(res)))
                            .catch(e => console.log("Error: " + JSON.stringify(e)));
                    }
                    return result;
                })
                .catch(e => console.log(JSON.stringify(e)));
        }
    }

    getNotices() {
        let sql = "SELECT * FROM `tbl_notices` WHERE `is_active`= 1";
        return this.db.executeSql(sql, [])
            .then((result) => {
                console.log(JSON.stringify(result));
                let arraySession = [];
                if (result.rows.length > 0) {
                    for (var i = 0; i < result.rows.length; i++) {
                        arraySession.push({
                            notice_id: result.rows.item(i).notice_id,
                            title: result.rows.item(i).title,
                            body: result.rows.item(i).body,
                            image: result.rows.item(i).image,
                            create_date: result.rows.item(i).create_date
                        });
                    }
                }
                return arraySession;
            })
            .catch(e => {
                console.log(JSON.stringify(e))
                return [];
            });
    }
}
