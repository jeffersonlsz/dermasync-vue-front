export default {
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            binding.value(); // chama o método passado
            observer.unobserve(el); // dispara só uma vez
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
    }
  };
  