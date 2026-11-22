type Service = 'Oración' | 'Acompañamiento pastoral' | 'Grupos y comunidad' | 'Evangelización y servicio';
const dialog = document.querySelector<HTMLDialogElement>('#info-dialog')!;
const title = document.querySelector<HTMLElement>('#dialog-title')!;
const copy = document.querySelector<HTMLElement>('#dialog-copy')!;
const value = document.querySelector<HTMLElement>('#dialog-value')!;
const input = document.querySelector<HTMLInputElement>('#custom-amount')!;
let selectedAmount: number = 50000;
const pesos = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
document.querySelectorAll<HTMLButtonElement>('[data-amount]').forEach(button => button.addEventListener('click', () => {
  selectedAmount = Number(button.dataset.amount);
  input.value = '';
  document.querySelectorAll<HTMLButtonElement>('[data-amount]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
}));
input.addEventListener('input', () => {
  document.querySelectorAll<HTMLButtonElement>('[data-amount]').forEach(item => item.setAttribute('aria-pressed', 'false'));
});
document.querySelectorAll<HTMLButtonElement>('[data-donate]').forEach(button => button.addEventListener('click', () => {
  title.textContent = 'Juntos haremos posible el nuevo templo.';
  copy.textContent = 'Gracias por querer ser parte. Esta versión es una demostración: todavía no recibe donaciones. Publicaremos los canales oficiales una vez que la iglesia confirme la entidad beneficiaria y se complete su verificación.';
  const amount = input.value ? Number(input.value) : selectedAmount;
  value.textContent = Number.isFinite(amount) && amount >= 1000 && amount <= 1000000000 && Number.isInteger(amount)
    ? `Aporte seleccionado como ejemplo: ${pesos.format(amount)} COP. No se ha realizado ningún cobro.`
    : 'El valor de ejemplo debe ser un número entero entre $1.000 y $1.000.000.000 COP. No se ha realizado ningún cobro.';
  dialog.showModal();
}));
const serviceText: Record<Service, string> = {
  'Oración': 'Aquí podrás consultar los encuentros de oración y cómo compartir una petición por un canal oficial. Horarios, responsable y canal de atención pendientes de confirmar. Esta propuesta no recoge peticiones ni datos personales.',
  'Acompañamiento pastoral': 'Aquí encontrarás el nombre del pastor o pastora y un medio oficial para solicitar acompañamiento. El nombre, la fotografía autorizada, los horarios de atención y el contacto se incorporarán cuando la iglesia los confirme.',
  'Grupos y comunidad': 'Este espacio presentará los grupos de la iglesia, sus responsables y sus encuentros. Los nombres de los grupos, las edades, los horarios y los contactos están pendientes de confirmación.',
  'Evangelización y servicio': 'Aquí se compartirán las iniciativas de evangelización y servicio aprobadas por la iglesia, junto con las formas de participar. Las actividades y sus responsables están pendientes de confirmación.'
};
document.querySelectorAll<HTMLButtonElement>('[data-service]').forEach(button => button.addEventListener('click', () => {
  const service = button.dataset.service as Service;
  title.textContent = service;
  copy.textContent = serviceText[service];
  value.textContent = 'Contenido preliminar · Sin envío de información.';
  dialog.showModal();
}));
const photo = document.querySelector<HTMLDialogElement>('#photo-dialog')!;
document.querySelector('#view-history')!.addEventListener('click', () => photo.showModal());
document.querySelectorAll<HTMLDialogElement>('dialog').forEach(modal => {
  modal.querySelectorAll('button.dialog-close, button.dialog-dismiss').forEach(button => button.addEventListener('click', () => modal.close()));
});
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const nav = document.querySelector<HTMLElement>('#navegacion')!;
function closeMenu(): void { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a,button').forEach(item => item.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
matchMedia('(min-width:761px)').addEventListener('change', closeMenu);
