const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Yasin05kaya.',
    database: 'carbon_db'
});

db.getConnection((err) => {
    if (err) {
        console.error("❌ MySQL Bağlantı Hatası:", err.message);
    } else {
        console.log("✅ MySQL Veritabanına Başarıyla Bağlanıldı.");
    }
});

app.post('/api/auth/register', async (req, res) => {
    const { username, email, password, age } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (username, email, password, age, points, level) VALUES (?, ?, ?, ?, 0, 1)";
        db.query(sql, [username, email, hashedPassword, age], (err, result) => {
            if (err) {
                console.error("Veritabanı Kayıt Hatası:", err);
                return res.status(400).json({ error: "Bu kullanıcı adı veya e-posta zaten kullanımda olabilir." });
            }
            res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu!" });
        });
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası oluştu." });
    }
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: "Kullanıcı bulunamadı!" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Hatalı şifre!" });
        }

        const token = jwt.encode({ id: user.id }, 'secret_key');
        
        res.json({ 
            token, 
            user: { id: user.id, username: user.username, points: user.points, level: user.level } 
        });
    });
});
app.post('/api/user/update-points', (req, res) => {
    const { xp } = req.body;
    const token = req.headers.authorization; 
    
    const sql = "UPDATE users SET points = points + ? WHERE id = (SELECT id FROM (SELECT id FROM users LIMIT 1) as t)";
    
    db.query(sql, [xp], (err, result) => {
        if (err) return res.status(500).json({ error: "Puan güncellenemedi." });
        res.json({ message: "Puanlar başarıyla eklendi!" });
    });
});

app.post('/api/user/update-emissions', (req, res) => {
    const { userId, xp, co2 } = req.body;

    const updateUserSql = `
        UPDATE users 
        SET points = points + ?, 
            level = FLOOR((points + ?) / 500) + 1,
            last_test_date = NOW()
        WHERE id = ?`;

    db.query(updateUserSql, [xp, xp, userId], (err) => {
        if (err) return res.status(500).json({ error: "Kullanıcı güncellenemedi" });
        const insertHistorySql = "INSERT INTO emissions_history (user_id, total_co2) VALUES (?, ?)";
        db.query(insertHistorySql, [userId, co2], (err2) => {
            if (err2) return res.status(500).json({ error: "Geçmişe kaydedilemedi" });

            const getHistorySql = "SELECT total_co2, test_date FROM emissions_history WHERE user_id = ? ORDER BY test_date DESC LIMIT 2";
            db.query(getHistorySql, [userId], (err3, results) => {
                if (err3) return res.status(500).json({ error: "Geçmiş çekilemedi" });
                
                res.json({ 
                    message: "Veriler senkronize edildi!",
                    history: results 
                });
            });
        });
    });
});

app.get('/api/user/leaderboard', (req, res) => {
    const sql = "SELECT username, points, level FROM users ORDER BY points DESC LIMIT 10";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
app.get('/api/user/emissions-history/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT total_co2, test_date FROM emissions_history WHERE user_id = ? ORDER BY test_date DESC LIMIT 7";
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT} portunda hazır ve nazır!`);
});
