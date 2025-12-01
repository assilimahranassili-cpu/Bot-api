import puppeteer from "puppeteer";

async function runBot() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  // 1️⃣ الدخول للموقع
  const url = "https://faucetpay.io/";  // ضع هنا الرابط الذي تريد
  await page.goto(url, { waitUntil: "networkidle2" });

  // 2️⃣ أخذ Screenshot كـ Base64 (بدون حفظ)
  const screenshotBase64 = await page.screenshot({ encoding: "base64", fullPage: true });
  console.log("📸 Screenshot (Base64) جاهزة للعرض");

  // 3️⃣ استخراج الحقول النصية (input)
  const inputs = await page.$$eval("input", elements =>
    elements.map(el => ({
      type: el.type,
      name: el.name || el.id || "(بدون اسم)",
      placeholder: el.placeholder || ""
    }))
  );

  console.log("\n📝 الحقول النصية في الصفحة:");
  inputs.forEach((input, i) => {
    console.log(`${i + 1}. type: ${input.type}, name/id: ${input.name}, placeholder: ${input.placeholder}`);
  });

  // 4️⃣ استخراج الأزرار
  const buttons = await page.$$eval("button", elements =>
    elements.map(el => ({
      text: el.innerText || "(بدون نص)",
      id: el.id || "(بدون id)",
      class: el.className || "(بدون class)"
    }))
  );

  console.log("\n🔘 الأزرار في الصفحة:");
  buttons.forEach((btn, i) => {
    console.log(`${i + 1}. text: ${btn.text}, id: ${btn.id}, class: ${btn.class}`);
  });

  await browser.close();
}

runBot();
