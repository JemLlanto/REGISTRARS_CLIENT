export const newStatusLabel = (status) => {
  return (
    String(
      status === "pending"
        ? "processing"
        : status === "processing"
          ? "preparing"
          : status === "ready to pickup"
            ? "for release"
            : status,
    )
      .charAt(0)
      .toUpperCase() +
    String(
      status === "pending"
        ? "processing"
        : status === "processing"
          ? "preparing"
          : status === "ready to pickup"
            ? "for release"
            : status,
    ).slice(1)
  );
};
