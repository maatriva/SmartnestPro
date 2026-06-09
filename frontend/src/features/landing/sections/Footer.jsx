import { useState } from "react";
import { Link } from "react-router-dom";

import ContactModal from "../../../shared/components/ContactModal";

import useContactForm from "../hooks/useContactForm";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const {
    formData,
    loading,
    status,
    handleChange,
    handleSubmit,
  } = useContactForm(() =>
    setIsModalOpen(false)
  );

  return (
    <>
      <footer
        id="footer"
        className="footer-blend backdrop-blur-xl text-(--text) py-16 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">

          {/* Footer content here */}

          <div className="border-t border-(--border) pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p>© 2026 Maatriva</p>

            <div className="flex gap-4">
              <a href="#">Privacy</a>

              <Link to="/terms">
                Terms
              </Link>
            </div>
          </div>

        </div>
      </footer>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        status={status}
      />
    </>
  );
}