// Mostrar seções com animação ao rolar
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section").forEach(sec => observer.observe(sec));

// Exibe o botão quando a página rola mais de 200px
window.addEventListener('scroll', function () {
  const btnTopo = document.getElementById('btnTopo');
  if (window.pageYOffset > 200) {
    btnTopo.classList.add('show');
  } else {
    btnTopo.classList.remove('show');
  }
});

// Ao clicar, rola suavemente para o topo
document.getElementById('btnTopo').addEventListener('click', function(){
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Carousel
const slides = document.querySelectorAll(".carousel img");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

// Auto-slide
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 5000);

// Formulário real via Formspree
const form = document.getElementById("formContato");
const statusMsg = document.getElementById("mensagemStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  statusMsg.textContent = "Enviando...";
  statusMsg.classList.add("sucesso");

  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      statusMsg.textContent = "Mensagem enviada com sucesso!";
      form.reset();
    } else {
      return response.json().then(data => {
        throw new Error(data.error || "Erro ao enviar formulário");
      });
    }
  }).catch(error => {
    statusMsg.textContent = "Erro ao enviar. Tente novamente mais tarde.";
    statusMsg.classList.remove("sucesso");
    statusMsg.style.color = "#721c24";
    statusMsg.style.backgroundColor = "#f8d7da";
    statusMsg.style.borderColor = "#f5c6cb";
  });
});


