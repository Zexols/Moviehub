import { ConfigProvider, Pagination } from "antd";

export default function CustomPagination(props) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            colorPrimary: "#ff4d4f",
            colorBgContainer: "#111",
            colorText: "#ccc",
            colorTextDisabled: "#555",
            colorPrimaryHover: "#ff5555",
            
          },
        },
      }}
    >
      <Pagination {...props}/>
    </ConfigProvider>
  );
}
