/
|-- src/
|   |-- components/
|   |   |-- sections/
|   |   |   |-- olimpo_barber/
|   |   |   |   |-- BarberBarbers.tsx  <-- ONDE VOCÊ VAI CHAMAR O MODAL
|   |   |-- common/                  <-- NOVA PASTA PARA COMPONENTES GENÉRICOS
|   |   |   |-- BookingModal/
|   |   |   |   |-- BookingModal.tsx   <-- NOVO COMPONENTE DO MODAL
|   |   |   |   |-- BookingModal.module.css <-- CSS para o modal
|   |   |   |   |-- BarberCard.tsx    <-- NOVO COMPONENTE PARA O CARD DO BARBEIRO
|   |-- services/
|   |   |-- firebaseConfig.ts
|   |-- types/
|   |   |-- index.ts                 <-- Atualizaremos a interface Barber aqui