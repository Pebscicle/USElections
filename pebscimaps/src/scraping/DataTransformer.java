package scraping;

import java.util.ArrayList;
import java.util.List;

public class DataTransformer{

    public static void main(String[] args){

        String sourceData = ".Calhoun County, Alabama	116,441	116,243	115,678	115,780	116,429.Chambers County, Alabama	34,772	34,651	34,488	34,164	34,079.Cherokee County, Alabama	24,973	24,969	25,074	25,353	25,666.Chilton County, Alabama	45,011	45,057	45,259	45,848	46,431.Choctaw County, Alabama	12,669	12,626	12,548	12,431	12,252.Clarke County, Alabama	23,091	22,987	22,740	22,574	22,337.Clay County, Alabama	14,237	14,212	14,170	14,183	14,111.Cleburne County, Alabama	15,057	15,064	15,156	15,372	15,63.Coffee County, Alabama	53,459	53,549	54,199	54,840	55,643.Colbert County, Alabama	57,232	57,304	57,644	57,993	58,361.Conecuh County, Alabama	11,597	11,554	11,320	11,224	11,174.Coosa County, Alabama	10,378	10,335	10,314	10,307	10,268.Covington County, Alabama	37,563	37,506	37,570	37,603	37,952.Crenshaw County, Alabama	13,193	13,163	13,069	13,048	13,101.Cullman County, Alabama	87,857	88,136	89,639	90,663	92,016.Dale County, Alabama	49,322	49,257	49,395	49,495	49,871.Dallas County, Alabama	38,458	38,171	37,515	36,729	36,165.DeKalb County, Alabama	71,617	71,659	71,912	72,082	72,569.Elmore County, Alabama	87,980	87,861	88,789	89,600	90,441.Escambia County, Alabama	36,768	36,685	36,660	36,636	36,558.Etowah County, Alabama	103,434	103,453	103,010	102,903	103,241.Fayette County, Alabama	16,326	16,331	16,127	16,082	15,967.Franklin County, Alabama	32,112	32,078	31,998	31,910	31,802.Geneva County, Alabama	26,658	26,698	26,620	26,760	26,988.Greene County, Alabama	7,731	7,700	7,614	7,452	7,341.Hale County, Alabama	14,788	14,772	14,726	14,599	14,888.Henry County, Alabama	17,141	17,169	17,433	17,670	17,899.Houston County, Alabama	107,202	107,284	107,470	108,047	108,462.Jackson County, Alabama	52,579	52,545	52,719	52,923	53,467.Jefferson County, Alabama	674,340	674,717	669,990	665,084	662,895.Lamar County, Alabama	13,972	13,953	13,736	13,706	13,661.Lauderdale County, Alabama	93,562	94,025	94,853	95,875	96,814.Lawrence County, Alabama	33,074	33,089	33,073	33,187	33,502.Lee County, Alabama	174,247	174,754	177,596	180,698	183,215.Limestone County, Alabama	103,565	104,203	107,303	110,868	114,654.Lowndes County, Alabama	10,321	10,285	9,945	9,783	9,717.Macon County, Alabama	19,527	19,464	18,905	18,532	18,370.Madison County, Alabama	388,154	390,503	396,671	403,605	412,600.Marengo County, Alabama	19,325	19,270	18,985	18,791	18,684.Marion County, Alabama	29,340	29,176	29,001	29,182	29,244.Marshall County, Alabama	97,611	97,702	98,286	99,428	100,756.Mobile County, Alabama	414,809	414,377	413,383	411,398	411,640.Monroe County, Alabama	19,771	19,706	19,550	19,412	19,229.Montgomery County, Alabama	228,952	228,342	226,935	226,301	224,980.Morgan County, Alabama	123,424	123,288	123,375	124,231	125,133.Perry County, Alabama	8,513	8,458	8,328	7,904	7,738.Pickens County, Alabama	19,130	18,969	18,618	18,749	18,688.Pike County, Alabama	33,002	32,900	32,746	33,008	33,137.Randolph County, Alabama	21,961	22,086	22,184	22,460	22,786.Russell County, Alabama	59,182	59,258	58,681	58,594	58,744.St. Clair County, Alabama	91,468	91,657	92,874	93,881	95,552.Shelby County, Alabama	223,038	223,912	227,453	230,033	233,000.Sumter County, Alabama	12,344	12,191	11,967	11,889	11,727.Talladega County, Alabama	82,149	81,575	80,734	80,748	81,132.Tallapoosa County, Alabama	41,309	41,284	41,099	40,913	40,677.Tuscaloosa County, Alabama	227,037	231,547	235,670	236,690	237,373.Walker County, Alabama	65,344	65,138	64,636	64,438	64,728.Washington County, Alabama	15,389	15,329	15,223	15,094	15,022.Wilcox County, Alabama	10,598	10,534	10,423	10,139	9,944.Winston County, Alabama	23,547	23,493	23,655	23,741	23,611";

        String state = "Alabama";

        String[] counties = new String[1000];
        counties = sourceData.split("County");

        /*
         * MODEL:
         * {
                "id": "Bibb County, Alabama",
                "name": "Bibb",
                "population": 21868
            },
         */

        

       

        String firstCounty = counties[0].substring(1, counties[0].length()-1);

        for(int i = 1; i < counties.length; i++){
            System.out.println("{");

            String populationAndNextCounty = counties[i].split(" ")[5];
            int pop = Integer.parseInt(populationAndNextCounty.split(".")[0]);

            if(i==1){
                System.out.println("\"id\": \""+firstCounty+" County, "+state+"\",");
                System.out.println("\"name\": \""+firstCounty+"\",");
                System.out.println("\"population\": "+ pop);
            }
            
            firstCounty = populationAndNextCounty.split(".")[1].strip();


            System.out.println("},");
        }

        

    }

}