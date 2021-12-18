import 'components/pages/AboutPage/AboutPage.scss';

const AboutPage = () => (
  <div className="about-page-container mx-auto mt-4">
    <h2 className="my-3 mb-4 text-center">
      A Harvest é uma plataforma que visa aproximar candidatos e empresas.
    </h2>
    <p>
      Enxergamos um abismo entre a expectativa dos candidatos diante de um processo seletivo e o que
      de fato acontece. Assim, criamos a plataforma Harvest para ser a ponte entre este abismo, de
      um modo simples e rápido.
    </p>
    <p>
      O objetivo é que a avaliação dos candidatos possa nortear os processos seletivos das empresas
      e agregar valor para o mercado como um todo:
    </p>
    <ul>
      <li>Processo seletivos que agregam no crescimento e aprendizagem dos candidatos.</li>
      <li>Atração de candidatos mais preparados aos perfis das empresas.</li>
      <li>Mercado com profissionais mais qualificados e orientados.</li>
    </ul>
  </div>
);

export default AboutPage;
