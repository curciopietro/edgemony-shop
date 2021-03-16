import "./ModalSideBar.css";

export default function ModalSideBar({
  modalSidebar,
  openSideBar,
  children,
  title,
}) {
  return (
    <section
      className={modalSidebar ? "modal-sidebar" : "modal-sidebar slide-to-left"}
    >
      <header className="modal-sidebar__header">
        <i
          className="fas fa-times modal-sidebar-close"
          onClick={openSideBar}
        ></i>
        <div className="modal-sidebar__title">{title}</div>
      </header>
      {children}
    </section>
  );
}
